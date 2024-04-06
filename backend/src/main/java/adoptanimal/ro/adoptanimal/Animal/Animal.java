package adoptanimal.ro.adoptanimal.Animal;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(value="animal")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Animal {
  @Id
  private String id;
  @Indexed(unique = true)
  private String idNumber = "Unknown";
  @NotNull(message = "Name cannot be null")
  private String givenName;
  @NotNull(message = "Breed cannot be null")
  private String breed;
  private String image = "https://i.imgur.com/iiTbkfx.jpg";
  private LocalDateTime birthdayDate = null;
  private Integer age = null;
  private LocalDateTime createdTime;
  private LocalDateTime lastUpdate = null;

  public Animal(String givenName, String breed) {
    this.givenName = givenName;
    this.breed = breed;
  }

  public Animal(String idNumber, String givenName, String breed) {
    this.idNumber = idNumber;
    this.givenName = givenName;
    this.breed = breed;
  }


  public Animal(String idNumber, String givenName, String breed, LocalDateTime birthdayDate) {
    this.idNumber = idNumber;
    this.givenName = givenName;
    this.breed = breed;
    this.birthdayDate = birthdayDate;
    this.age = (int)ChronoUnit.YEARS.between(birthdayDate, LocalDateTime.now());
  }

  @JsonCreator
  public Animal(@JsonProperty("idNumber") String idNumber,
                @JsonProperty("givenName") String givenName, 
                @JsonProperty("breed") String breed, 
                @JsonProperty("birthdayDate") String birthdayDate,
                @JsonProperty("image") String image) {
    this.idNumber = idNumber;
    this.givenName = givenName;
    this.breed = breed;
    this.image = image;
    String[] splitted = birthdayDate.split("\\-");
    System.out.println(splitted[0]);
    this.birthdayDate = LocalDateTime.of(Integer.parseInt(splitted[0]),Integer.parseInt(splitted[1]), Integer.parseInt(splitted[2]), 0, 0, 0);
    this.age = (int)ChronoUnit.YEARS.between(this.birthdayDate, LocalDateTime.now());
  }


  @Override
  public String toString() {
    return "Animal [id=" + id + ", givenName=" + givenName + ", breed=" + breed + ", birthdayDate=" + birthdayDate+ "]";
  }

  
  
}
