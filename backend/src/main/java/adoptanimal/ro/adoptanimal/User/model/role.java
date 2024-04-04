package adoptanimal.ro.adoptanimal.user.model;

import java.util.Arrays;
import java.util.List;
public enum role {
  MEMBER(Arrays.asList(permission.USER_ADMIN)),

  ADMIN(Arrays.asList(permission.USER_ADMIN, permission.USER_MEMBER)),

  DEVELOPER(Arrays.asList(permission.USER_DEVELOPER, permission.USER_ADMIN, permission.USER_MEMBER));

  private List<permission> permissions;

  private role(List<permission> permissions) {
    this.permissions = permissions;
  }

  public List<permission> getPermissions() {
    return permissions;
  }

  public void setPermissions(List<permission> permissions) {
    this.permissions = permissions;
  }
}
