package adoptanimal.ro.adoptanimal.user.Authentication;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import adoptanimal.ro.adoptanimal.Config.jwtService;
import adoptanimal.ro.adoptanimal.user.MyUser;
import adoptanimal.ro.adoptanimal.user.UserRepository;

@Service
public class AuthenticatioService {
  @Autowired
  private AuthenticationManager authenticationManager;
  @Autowired
  UserRepository userRepository;
  @Autowired
  private jwtService jwtService;

  @Autowired
  private PasswordEncoder passwordEncoder;


  public AuthenticatioService(PasswordEncoder passwordEncoder) {
    this.passwordEncoder = passwordEncoder;
  }

  public AuthenticationResponse register(MyUser request) {
    MyUser user = new MyUser(request.getUsername(),passwordEncoder.encode(request.getPassword()),request.getRole(),request.getEmail(),request.getPhoneNumber(),request.getFirstName(),request.getLastName(),request.getGender(),request.getAdress(),request.getBirthDate());
    user.setCreatedTime(LocalDateTime.now());
    userRepository.save(user);
    String token = jwtService.generateToken(user, generateExtraClaims(user));
    return new AuthenticationResponse(token);
  }

  public Optional<MyUser> getUserRequest(AuthenticationRequest authenticationRequest){
    return userRepository.findUserByUsername(authenticationRequest.getUsername()); 
  }

  public AuthenticationResponse login(AuthenticationRequest authenticationRequest) {
    UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(), authenticationRequest.getPassword());
    authenticationManager.authenticate(authToken);
    MyUser user = userRepository.findUserByUsername(authenticationRequest.getUsername()).get();
    String jwt = jwtService.generateToken(user,generateExtraClaims(user));
    return new AuthenticationResponse(jwt);

   }
  private Map<String, Object> generateExtraClaims(MyUser user) {
    Map<String, Object> extraClaims = new HashMap<>();
    extraClaims.put("firstname",user.getFirstName());
    extraClaims.put("lastname", user.getLastName());
    extraClaims.put("role",user.getRole());

    return extraClaims;
  }
}
