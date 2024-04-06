package adoptanimal.ro.adoptanimal.user.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import adoptanimal.ro.adoptanimal.user.authentication.AuthenticationRequest;

@RestController
@RequestMapping("/member")
public class UserController {



  @GetMapping("/test")
  public ResponseEntity<?> test() {
    System.err.println("INTRA");
    return new ResponseEntity<>("EOK",HttpStatus.OK); 
  }
}
