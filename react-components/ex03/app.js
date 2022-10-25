const person = {
  name: 'Dragos',
  surname: 'Iordache',
  age: 32,
  petOwner: true,
  friends: {
    larry: {
      name: 'Larry',
      surname: 'Larryson',
      age: 30,
    },
    steven: {
      name: 'Steven',
      surname: 'Stevenson',
      age: 31,
    },
    carol: {
      name: 'Carol',
      age: 29,
      surname: 'Carolson',
    },
  },
};

console.warn(
  `Folosind Object.values(), afiseaza o lista inversata cu numele complet inversat al prietenilor. `,
);
const values1 = Object.values(person.friends);
values1.reverse();

values1.forEach(({ name, surname }) => {
  console.log(`${surname} ${name}`);
});

console.warn(
  `Afiseaza propozitia: “Prietenii mei sunt Larry, Steven si Carol.” folosind Object.values()`,
);

console.log(
  Object.values(person.friends).reduce((carry, { name }, index, friends) => {
    let punctuation = ', ';
    punctuation = friends.length - 1 === index ? '.' : punctuation;
    punctuation = friends.length - 2 === index ? ' si ' : punctuation;

    carry = `${carry}${name}${punctuation}`;

    return carry;
  }, 'Prietenii mei sunt '),
);

console.warn(
  `Prin aceeasi metoda, afiseaza propozitia: “Diferenta de varsta intre Larry si Dragos este de xxx ani.” etc…`,
);

const sentences = values1.map(({ name, age }) => {
  const diff = Math.abs(person.age - age);

  return `Diferenta de varsta dintre ${name} si ${person.name} este de ${diff} ani.`;
});

console.log(sentences.toString());

console.warn(
  `Prin aceeasi metoda, afiseaza o lista cu numele complet al prietenilor. `,
);
Object.values(person.friends).forEach(({ name, surname }) => {
  console.log(`${name} ${surname}`);
});

console.warn(
  `Afiseaza propozitia: “Prietenii mei sunt Larry Larryson, Steven Stevenson si Carol Carolson.” folosind Object.values()`,
);

console.log(
  Object.values(person.friends).reduce(
    (carry, { name, surname }, index, friends) => {
      let punctuation = ', ';
      punctuation = friends.length - 1 === index ? '.' : punctuation;
      punctuation = friends.length - 2 === index ? ' si ' : punctuation;

      carry += `${name} ${surname}${punctuation}`;

      return carry;
    },
    'Prietenii mei sunt ',
  ),
);

console.warn(
  `In mod similar, afiseaza propozitia  “Larry are xx ani. Steven are …”`,
);

console.log(
  Object.values(person.friends)
    .map(({ name, age }) => {
      return `${name} are ${age} ani.`;
    })
    .toString(),
);
