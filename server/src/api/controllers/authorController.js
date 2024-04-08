// In-memory storage for authors
let authors = [];

export const addAuthor = (req, res) => {
  const { fullName, bio, birthDate, primaryGenre } = {...req.body, ...req.query};
  const newAuthor = { fullName, bio, birthDate, primaryGenre, id: authors.length + 1};
  authors.push(newAuthor);
  res.status(201).json(newAuthor);
};

export const listAuthors = (req, res) => {
  res.json(authors);
};

export const updateAuthorBio = (req, res) => {
  const id = req.params.id;
  const { bio } = req.body;
  const author = authors.find((a) => a.id === parseInt(id));
  if (!author) {
    return res.status(404).json({ error: 'Author not found' });
  }
  author.bio = bio;
  res.json(author);
};

export const getAuthorByName = (req, res) => {
  const name = req.params.name;
  const author= authors.find((a) => a.fullName === name);
  if (!author) {
    return res.status(404).json({ error: 'Author not found' });
  }
  return res.json(author);
}

export const findAuthorByName = (name) => {
  return authors.find((a) => a.fullName === name);
}  


export default {
  addAuthor,
  listAuthors,
  updateAuthorBio,
  getAuthorByName,
};