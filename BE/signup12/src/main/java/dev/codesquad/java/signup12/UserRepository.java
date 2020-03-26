package dev.codesquad.java.signup12;

import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;


public interface UserRepository extends CrudRepository<User, Long> {
  @Query("SELECT user_id FROM user WHERE user_id = :userId")
  String findByUserId(@Param("userId") String userId);

  @Query("SELECT email FROM user WHERE email = :email")
  String findByEmail(@Param("email") String email);

  @Query("SELECT phone FROM user WHERE phone = :phone")
  String findByPhone(@Param("phone") String phone);
}
