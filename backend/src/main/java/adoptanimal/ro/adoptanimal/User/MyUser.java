package adoptanimal.ro.adoptanimal.User;

import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(value="users")
public class MyUser {
  @Id
  private String id;
  @Indexed(unique = true)
  private String username;
  private String password;
  private String role;
  @Indexed(unique = true)
  private String email;
  @Indexed(unique = true)
  private String phoneNumber;
  private String firstName;
  private String lastName;
  private Gender gender;
  private Adress adress;
  private LocalDateTime birthDate;
  private LocalDateTime createdTime;
  public MyUser(String username, String password, String role) {
    this.username = username;
    this.password = password;
    this.role = role;
  }


}
