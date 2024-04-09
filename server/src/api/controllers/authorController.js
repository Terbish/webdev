// In-memory storage for authors
let authors = [];

export const addAuthor = (req, res) => {
  const { fullName, bio, birthDate, primaryGenre } = req.body;
  const newAuthor = { fullName, bio, birthDate, primaryGenre, authorId: authors.length + 1};
  authors.push(newAuthor);
  res.status(201).json(newAuthor);
};

export const listAuthors = (req, res) => {
  res.json(authors);
};

export const updateAuthorBio = (req, res) => {
  const { id, bio } = req.body;
  const author = authors.find((a) => a.authorId === parseInt(id));
  if (!author) {
    return res.status(404).json({ error: 'Author not found' });
  }
  author.bio = bio;
  res.json(author);
};

export const getAuthorByName = (req, res) => {
  const { authorName } = req.body;
  const author = authors.find((a) => a.fullName === authorName);
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