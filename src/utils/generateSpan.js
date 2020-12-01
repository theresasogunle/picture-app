const generateSpan = () => {
  let gen = Math.floor(Math.random() * 8);
  do {
    gen = Math.floor(Math.random() * 8);
  } while (gen < 4);
  return gen;
};

export default generateSpan;
