package adoptanimal.ro.adoptanimal.config;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import adoptanimal.ro.adoptanimal.user.model.myUser;
import adoptanimal.ro.adoptanimal.user.repository.userRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter{

  @Autowired
  private jwtService jwtservice;
  @Autowired
  private userRepository userRepository;

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
   String username = jwtservice.extractUsername(jwt);
   //4. Set authenticate object inside our security context
   myUser user = userRepository.findUserByUsername(username).get();
   UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(username, null, user.getAuthorities());
   SecurityContextHolder.getContext().setAuthentication(authToken);

   //5. execute rest of the filters

   filterChain.doFilter(request, response);
  }

}
