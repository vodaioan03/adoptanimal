package adoptanimal.ro.adoptanimal.Animal.Service;

import java.util.List;
import java.util.Optional;

import adoptanimal.ro.adoptanimal.Animal.Animal;
import adoptanimal.ro.adoptanimal.Exceptions.AnimalCollectionException;
import jakarta.validation.ConstraintViolationException;

public interface AnimalService {

  public List<Animal> getAnimals() throws ConstraintViolationException,AnimalCollectionException;
  public Optional<Animal> getAnimalByIdNumber(String idNumber) throws AnimalCollectionException;
  public void updateAnimalById(String id, Animal animalUpdate) throws AnimalCollectionException;
}
