export const lengthError = (validation, constraint) => {
  const { property, constraints } = validation;
  if (constraint === 'min') {
    return `la taille de ${property} doit depasser ${constraints[0]} caracteres`;
  }
  if (constraint === 'max') {
    return `la taille de ${property} ne doit pas depasser ${constraints[0]} caracteres`;
  }
  return 'verifier votre input';
};
