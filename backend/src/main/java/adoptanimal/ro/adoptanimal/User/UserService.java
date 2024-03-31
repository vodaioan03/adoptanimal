package adoptanimal.ro.adoptanimal.User;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import jakarta.validation.ConstraintViolationException;

@Service
public class UserService implements UserDetailsService {

  @Autowired
  private UserRepository userRepository;
  @Autowired
  private PasswordEncoder passwordEncoder;



public void saveEntity(MyUser user) throws ConstraintViolationException,Exception{
    if (this.entityPresent(user)) {
      throw new Exception("User already exist "+user.getUsername());
    }
    else{
      user.setCreatedTime(LocalDateTime.now());
      user.setPassword(passwordEncoder.encode(user.getPassword()));
      userRepository.save(user);
    }
  }

  public Boolean entityPresent(MyUser user) {
    Optional<MyUser> userFound = userRepository.findUserByUsername(user.getUsername());
    return userFound.isPresent();
  }

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    Optional<MyUser> userFound = userRepository.findUserByUsername(username);
    if(userFound.isPresent()){
      MyUser object = userFound.get();
      return User.builder()
                              .username(object.getUsername())
                              .password(object.getPassword())
                              .roles(getRoles(object))
                              .build();
    }
    else{
      throw new UsernameNotFoundException(username);
    }
  }

  private String[] getRoles(MyUser user) {
    if (user.getRole() == null) {
      return new String[]{"USER"};
    }
    return user.getRole().split(",");
  }
  
}
