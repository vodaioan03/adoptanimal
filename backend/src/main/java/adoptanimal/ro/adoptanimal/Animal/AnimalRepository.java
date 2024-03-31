package adoptanimal.ro.adoptanimal.Animal;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface AnimalRepository extends MongoRepository<Animal, String>{
  @Query("{'idNumber': ?0}")
  Optional<Animal> findAnimalByIdNumber(String idNumber);
  @Query("{'id': ?0}")
  Optional<Animal> findAnimalById(String id);
}
