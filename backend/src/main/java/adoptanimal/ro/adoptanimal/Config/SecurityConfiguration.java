package adoptanimal.ro.adoptanimal.Config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import adoptanimal.ro.adoptanimal.User.UserService;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration {
  @Autowired
  UserService userService;
  @Bean
  public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
    return httpSecurity
      .csrf(AbstractHttpConfigurer::disable)
      .authorizeHttpRequests(registry -> {
      registry.requestMatchers("/home","/account/**").permitAll();
      registry.requestMatchers("/admin/**").hasRole("ADMIN");
      registry.requestMatchers("/user/**").hasRole("USER");
      registry.anyRequest().authenticated();
    }).formLogin(formLogin -> formLogin.permitAll()).build();
  }

  @Bean
   public UserDetailsService userdeDetailsService() {
    return userService;
  }


  @Bean
  public AuthenticationProvider authenticationProvider() {
    DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
    provider.setUserDetailsService(userService);
    provider.setPasswordEncoder(passwordEncoder());
    return provider;
  }

  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }
}
