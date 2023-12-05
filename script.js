const express = require('express');
const app = express();
const path = require('path');
const Joi = require('joi'); 
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const courses = [
  { id: 1, name: 'course1' },
  { id: 2, name: 'course2' },
  { id: 3, name: 'course3' },
];

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('ohhh poo Something went wrong 0_o: ${err.message}');
});

app.get('/', (req, res) => {
  const data = {
    title: 'My 0_0',
    photographer: ' 0_oo',
  };
  res.render('index', data);
});

app.put('/api/courses/:id', (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    return res
      .status(404)
      .send('the course with the given Id went ohhh poo 0_o');

  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  course.name = req.body.name;
  res.send(course);
});

function validateCourse(course) {
  const schema = {
    name: Joi.string().min(3).required(),
  };
  return Joi.validate(course, schema);
}

app.post('/api/courses', (req, res) => {
  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(course);
});

app.delete('/api/courses/:id', (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send('the course went ohhh poo 0_o');

  const index = courses.indexOf(course);
  courses.splice(index, 1);

  res.send(course);
});

app.listen(port, () => console.log(`Listening on port ${port}`));

