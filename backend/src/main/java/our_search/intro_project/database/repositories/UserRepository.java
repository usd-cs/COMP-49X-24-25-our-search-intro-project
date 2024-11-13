package our_search.intro_project.database.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import our_search.intro_project.database.entities.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {

    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);
}
