package adoptanimal.ro.adoptanimal.Animal.Service;


import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import adoptanimal.ro.adoptanimal.Animal.Animal;
import adoptanimal.ro.adoptanimal.Animal.AnimalRepository;
import adoptanimal.ro.adoptanimal.Exceptions.AnimalCollectionException;
import jakarta.validation.ConstraintViolationException;
import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class AnimalServiceImplementation implements AnimalService {
  private AnimalRepository animalRepository;

  @Override
  public List<Animal> getAnimals(){
    List<Animal> animals = animalRepository.findAll();
    if(animals.size() != 0) return animals;
    else return new ArrayList<Animal>();
  }

  @Override
  public Optional<Animal> getAnimalByIdNumber(String idNumber) throws AnimalCollectionException{
    Optional<Animal> animalFound = animalRepository.findAnimalByIdNumber(idNumber);
    if(animalFound.isPresent()) return animalFound;
    else throw new AnimalCollectionException(AnimalCollectionException.NotFound(idNumber));
  }


  @Override
  public void updateAnimalById(String id, Animal animalUpdate) throws AnimalCollectionException {
    Optional<Animal> animalFoundId = animalRepository.findAnimalById(id);
    Optional<Animal> animalFoundByNumber = animalRepository.findAnimalByIdNumber(animalUpdate.getIdNumber());
    if (animalFoundId.isPresent()) {
      if (animalFoundByNumber.isPresent()) {
        throw new AnimalCollectionException(AnimalCollectionException.AlreadyExist(animalFoundByNumber.get().getId()));
      }

      Animal animalToChange = animalFoundId.get();

      animalToChange.setBirthdayDate(animalUpdate.getBirthdayDate() != null ? animalUpdate.getBirthdayDate() : animalToChange.getBirthdayDate());
      animalToChange.setGivenName(animalUpdate.getGivenName() != null ? animalUpdate.getGivenName() : animalToChange.getGivenName());
      animalToChange.setBreed(animalUpdate.getBreed() != null ? animalUpdate.getBreed() : animalToChange.getBreed());
      animalToChange.setIdNumber(animalUpdate.getIdNumber() != null ? animalUpdate.getIdNumber() : animalToChange.getIdNumber());
      animalToChange.setLastUpdate(LocalDateTime.now());

      animalRepository.save(animalToChange);

    }
    else{
      throw new AnimalCollectionException(AnimalCollectionException.NotFound(id));
    }
    
  }

  public void deleteAnimals() {
    animalRepository.deleteAll();
  }

  public void saveEntity(Animal dog) throws ConstraintViolationException,AnimalCollectionException{
    if (this.entityPresent(dog)) {
      throw new AnimalCollectionException(AnimalCollectionException.AlreadyExist(dog.getIdNumber()));
    }
    else{
      dog.setCreatedTime(LocalDateTime.now());
      animalRepository.save(dog);
    }
  }

  public Boolean entityPresent(Animal dog) {
    Optional<Animal> animalFound = animalRepository.findAnimalByIdNumber(dog.getIdNumber());
    return animalFound.isPresent();
  }

}
