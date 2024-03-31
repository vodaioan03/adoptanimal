package adoptanimal.ro.adoptanimal.Exceptions;

public class AnimalCollectionException extends Exception {


  private static final long serialVersionUID = 1L;

  public AnimalCollectionException(String message) {
    super(message);
  }

  public static String NotFound(String id) {
    return "Dog with " + id + " not found";
  }

  public static String AlreadyExist(String id) {
    return "Dog with " + id + " already exists";
  }
}
