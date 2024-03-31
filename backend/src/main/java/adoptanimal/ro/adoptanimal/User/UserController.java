package adoptanimal.ro.adoptanimal.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.ConstraintViolationException;

@RestController
@RequestMapping(path = "/account")
public class UserController {

  @Autowired
  private UserService userService;
  
  @PostMapping("/register")
  public ResponseEntity<?> addUser(@RequestBody MyUser user) {
    try {
      userService.saveEntity(user);
      return new ResponseEntity<MyUser>(user,HttpStatus.OK);
    } catch (ConstraintViolationException e) {
      return new ResponseEntity<>(e.getMessage(),HttpStatus.UNPROCESSABLE_ENTITY);
    } catch (Exception e) {
      return new ResponseEntity<>(e.getMessage(),HttpStatus.CONFLICT);
    }
  }  

}
