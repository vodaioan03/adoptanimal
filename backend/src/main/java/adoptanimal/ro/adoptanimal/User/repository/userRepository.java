package adoptanimal.ro.adoptanimal.user.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import adoptanimal.ro.adoptanimal.user.model.myUser;

@Repository
public interface userRepository extends MongoRepository<myUser,String> {
  Optional<myUser> findUserByUsername(String username);
}
