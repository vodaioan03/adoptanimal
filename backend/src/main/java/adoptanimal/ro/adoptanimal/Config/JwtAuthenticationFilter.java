package adoptanimal.ro.adoptanimal.Config;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import adoptanimal.ro.adoptanimal.user.MyUser;
import adoptanimal.ro.adoptanimal.user.UserRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter{

  @Autowired
  private jwtService jwtService;
  @Autowired
  private UserRepository userRepository;

  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
      throws ServletException, IOException {
   // 1 obtain header that contains jwt

   String authHeader = request.getHeader("Authorization");

   if (authHeader == null || !authHeader.startsWith("Bearer ")) {
    filterChain.doFilter(request, response);
    return;
   }

   //2. Obtain jwt token
   String jwt = authHeader.split(" ")[1];

   //3. obtain subject/username in jwt
   String username = jwtService.extractUsername(jwt);

   //4. Set authenticate object inside our security context

   MyUser user = userRepository.findUserByUsername(username).get();

   UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(username, null, user.getAuthorities());

   SecurityContextHolder.getContext().setAuthentication(authToken);

   //5. execute rest of the filters

   filterChain.doFilter(request, response);
  }

}
