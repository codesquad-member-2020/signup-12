package dev.codesquad.java.signup12;

import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;


public interface UserRepository extends CrudRepository<User, Long> {
  @Query("select * from User u where u.userid = :userid")
  User findByUserid(@Param("userid") String userid);
}
