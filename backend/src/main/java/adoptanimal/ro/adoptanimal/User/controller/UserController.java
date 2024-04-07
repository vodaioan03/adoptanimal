package adoptanimal.ro.adoptanimal.user.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import adoptanimal.ro.adoptanimal.Exceptions.UserException;
import adoptanimal.ro.adoptanimal.user.model.myUser;
import adoptanimal.ro.adoptanimal.user.service.userService;


@RestController
@RequestMapping("/user")
public class UserController {

  @Autowired
  private userService service;

  @GetMapping("/getUser/{username}")
  public ResponseEntity<?> getUser(@PathVariable("username") String username) {
    try {
      return new ResponseEntity<myUser>(service.getUser(username),HttpStatus.OK);
    } catch (UserException e) {
      return new ResponseEntity<>(e.getMessage(),HttpStatus.NOT_FOUND);
    }
  }

  @PostMapping("/changeEmail/{username}")
  public ResponseEntity<?> changeEmail(@PathVariable("username") String username,@RequestBody String request) {
    try {
      service.changeMail(username,request);
      return new ResponseEntity<myUser>(service.getUser(username),HttpStatus.OK);
    } catch (UserException e) {
      return new ResponseEntity<>(e.getMessage(),HttpStatus.NOT_FOUND);
    }
  }

  @PostMapping("/changeNumber/{username}")
  public ResponseEntity<?> changeNumber(@PathVariable("username") String username,@RequestBody String request) {
    try {
      service.changeNumber(username,request);
      return new ResponseEntity<myUser>(service.getUser(username),HttpStatus.OK);
    } catch (UserException e) {
      return new ResponseEntity<>(e.getMessage(),HttpStatus.NOT_FOUND);
    }
  }

  @GetMapping("/test")
  public ResponseEntity<?> test() {
    System.err.println("INTRA");
    return new ResponseEntity<>("EOK",HttpStatus.OK); 
  }
}
