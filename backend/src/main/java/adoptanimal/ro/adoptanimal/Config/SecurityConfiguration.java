package adoptanimal.ro.adoptanimal.Config;

import org.springframework.web.filter.CorsFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import adoptanimal.ro.adoptanimal.User2.UserService;
import adoptanimal.ro.adoptanimal.user.Permission;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration {
  @Autowired
  UserService userService;
  @Autowired
  AuthenticationProvider authenticationProvider;

  @Autowired
  private JwtAuthenticationFilter jwtAuthenticationFilter;
  @Bean
  public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
    return httpSecurity
      .csrf(AbstractHttpConfigurer::disable)
      .sessionManagement(sessionManageConfig -> sessionManageConfig.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
      .authenticationProvider(authenticationProvider)
      .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
      .authorizeHttpRequests(registry -> {
      registry.requestMatchers("/auth/**","/home/**").permitAll();
      registry.requestMatchers("/admin/**").hasAuthority(Permission.USER_ADMIN.name());
      registry.requestMatchers("/member/**","/api/animal/**").hasAuthority(Permission.USER_MEMBER.name());
      registry.requestMatchers("/developer/**").hasAuthority(Permission.USER_DEVELOPER.name());
      registry.anyRequest().authenticated();
    })
    .build();
  }

  @Bean
  public CorsFilter corsFilter() {
      CorsConfiguration corsConfig = new CorsConfiguration();
      corsConfig.addAllowedOrigin("*"); // Permită orice origine
      corsConfig.addAllowedMethod("*"); // Permită toate metodele HTTP
      corsConfig.addAllowedHeader("*"); // Permită toate headerele

      UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
      source.registerCorsConfiguration("/**", corsConfig);

      return new CorsFilter(source);
  }
}
