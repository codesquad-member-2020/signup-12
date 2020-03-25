CREATE TABLE user (
  id bigint NOT NULL AUTO_INCREMENT,
  user_id varchar(64),
  password varchar(64),
  name varchar(64),
  birth_date varchar(64),
  gender varchar(64),
  email varchar(64),
  phone varchar(64),
  created_date datetime,
  PRIMARY KEY (id)
);

CREATE TABLE interest (
  id       bigint NOT NULL AUTO_INCREMENT,
  user_id  bigint NOT NULL,
  content   varchar(25),
  PRIMARY KEY (id),
  CONSTRAINT fk_interest_to_user FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE RESTRICT ON UPDATE RESTRICT
);
