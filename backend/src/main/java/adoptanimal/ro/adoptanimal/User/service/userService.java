package adoptanimal.ro.adoptanimal.user.service;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import adoptanimal.ro.adoptanimal.user.model.myUser;
import adoptanimal.ro.adoptanimal.user.repository.userRepository;
import jakarta.validation.ConstraintViolationException;

@Service
public class userService implements UserDetailsService {

  @Autowired
  private userRepository userRepository;
  @Autowired
  private PasswordEncoder passwordEncoder;


  
  public void saveEntity(myUser user) throws ConstraintViolationException,Exception{
    if (this.entityPresent(user)) {
      throw new Exception("User already exist "+user.getUsername());
    }
    else{
      user.setCreatedTime(LocalDateTime.now());
      user.setPassword(passwordEncoder.encode(user.getPassword()));
      userRepository.save(user);
    }
  }

  public Boolean entityPresent(myUser user) {
    Optional<myUser> userFound = userRepository.findUserByUsername(user.getUsername());
    return userFound.isPresent();
  }

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    Optional<myUser> userFound = userRepository.findUserByUsername(username);
    if(userFound.isPresent()){
      myUser object = userFound.get();
      return User.builder()
                              .username(object.getUsername())
                              .password(object.getPassword())
                              .authorities(object.getAuthorities())
                              .build();
    }
    else{
      throw new UsernameNotFoundException(username);
    }
  }
  
}
