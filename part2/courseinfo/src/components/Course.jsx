const Header = ({ course }) => <h2>{course.name}</h2>;

const Content = ({ parts }) => {
  return (
    <>
      {parts.map((part) => (
        <p key={part.id}>
          {part.name} {part.exercises}
        </p>
      ))}
    </>
  );
};

const Sum = ({ exercises }) => {
  const total = exercises.reduce((acc, curr) => acc + curr);
  return <strong>total of {total} exercises</strong>;
};

const Course = ({ course }) => {
  return (
    <>
      <Header course={course} />
      <Content parts={course.parts} />
      <Sum exercises={course.parts.map((part) => part.exercises)} />
    </>
  );
};

export default Course;
