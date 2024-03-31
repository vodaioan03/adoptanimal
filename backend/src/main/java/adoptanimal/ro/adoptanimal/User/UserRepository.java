package adoptanimal.ro.adoptanimal.User;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends MongoRepository<MyUser,String> {
  Optional<MyUser> findUserByUsername(String username);
}
