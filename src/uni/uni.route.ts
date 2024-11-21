import { Router } from 'express';

const uniRouter = Router();

let unis = [
  { id: 1, name: 'TU'},
  { id: 2, name: 'SU'},
];

uniRouter.get('/', (req, res) => {
  res.json(unis);
});

uniRouter.get('/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = unis.find((u) => u.id === userId);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

uniRouter.post('/', (req, res) => {
  const newUser = {
    id: unis.length + 1,
    name: req.body.name,
    email: req.body.email,
  };
  unis.push(newUser);
  res.status(201).json(newUser);
});

// PUT to update an existing user
uniRouter.put('/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = unis.findIndex((u) => u.id === userId);
  if (userIndex !== -1) {
    unis[userIndex] = {
      id: userId,
      name: req.body.name
    };
    res.json(unis[userIndex]);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// DELETE a user by ID
uniRouter.delete('/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = unis.findIndex((u) => u.id === userId);
  if (userIndex !== -1) {
    const deletedUser = unis.splice(userIndex, 1);
    res.json(deletedUser[0]);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

export {uniRouter, unis};
