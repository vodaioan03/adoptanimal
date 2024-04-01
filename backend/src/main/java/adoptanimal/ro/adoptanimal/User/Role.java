package adoptanimal.ro.adoptanimal.user;

import java.util.Arrays;
import java.util.List;
public enum Role {
  MEMBER(Arrays.asList(Permission.USER_MEMBER)),

  ADMIN(Arrays.asList(Permission.USER_ADMIN, Permission.USER_MEMBER)),

  DEVELOPER(Arrays.asList(Permission.USER_DEVELOPER, Permission.USER_ADMIN, Permission.USER_MEMBER));

  private List<Permission> permissions;

  private Role(List<Permission> permissions) {
    this.permissions = permissions;
  }

  public List<Permission> getPermissions() {
    return permissions;
  }

  public void setPermissions(List<Permission> permissions) {
    this.permissions = permissions;
  }
}
