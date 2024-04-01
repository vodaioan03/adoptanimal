package adoptanimal.ro.adoptanimal.Animal;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import adoptanimal.ro.adoptanimal.Animal.Service.AnimalServiceImplementation;
import adoptanimal.ro.adoptanimal.Exceptions.AnimalCollectionException;
import jakarta.validation.ConstraintViolationException;

import java.util.List;


@RestController
@RequestMapping(path = "/member")
@Controller
public class AnimalController {
  private final AnimalServiceImplementation animalService;

  @Autowired
  public AnimalController(AnimalServiceImplementation animalService) {
    this.animalService = animalService;
  } 



  @GetMapping("/getAnimals")
  public ResponseEntity<?> fetchAllAnimals() {
    List<Animal> animals = animalService.getAnimals();
    return new ResponseEntity<>(animals,animals.size() > 0 ? HttpStatus.OK : HttpStatus.NOT_FOUND);
  }

  @GetMapping("/getAnimal/{idNumber}")
  public ResponseEntity<?> getAnimalById(@PathVariable("idNumber") String idNumber) {
    try {
      return new ResponseEntity<>(animalService.getAnimalByIdNumber(idNumber),HttpStatus.OK);
    } catch (AnimalCollectionException e) {
      return new ResponseEntity<>(e.getMessage(),HttpStatus.NOT_FOUND);
    }
  }

  @PostMapping("/addAnimal")
  public ResponseEntity<?> addAnimal(@RequestBody Animal animal) {
    try {
      animalService.saveEntity(animal);
      return new ResponseEntity<Animal>(animal,HttpStatus.OK);
    } catch (ConstraintViolationException e) {
      return new ResponseEntity<>(e.getMessage(),HttpStatus.UNPROCESSABLE_ENTITY);
    } catch (AnimalCollectionException e) {
      return new ResponseEntity<>(e.getMessage(),HttpStatus.CONFLICT);
    }
  }  

  @PutMapping("/updateAnimal/{id}")
  public ResponseEntity<?> updateAnimalById(@PathVariable("id") String id, @RequestBody Animal animal) {
    try {
      animalService.updateAnimalById(id, animal);
      return new ResponseEntity<>("Update dog with "+id+" succesfully!",HttpStatus.OK);
    } catch (AnimalCollectionException e) {
      return new ResponseEntity<>(e.getMessage(),HttpStatus.NOT_FOUND);
    } catch (ConstraintViolationException e) {
      return new ResponseEntity<>(e.getMessage(),HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  @DeleteMapping("/deleteAnimals")
  public ResponseEntity<?> deleteAllAnimals() {
    animalService.deleteAnimals();
    List<Animal> animals = animalService.getAnimals();
    if(animals.size() == 0) {
      return new ResponseEntity<>("All animals deleted!",HttpStatus.OK);
    }
    else {
      return new ResponseEntity<>("ERROR! Animals are in database.",HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
