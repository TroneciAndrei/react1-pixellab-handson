const person = {
  name: 'Dragos',
  surname: 'Iordache',
  age: 32,
  petOwner: true,
  skills: {
    html: true,
    css: false,
    javaScript: true,
  },
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
  `Folosind Object.entries() pe proprietatea skills, afiseaza abilitatile persoanei daca acestea sunt true. Folosind propozitii de forma: “person.name cunoaste: html.” “person.name cunoaste: javaScript.”`,
);

Object.entries(person.skills).forEach(([skill, known]) => {
  if (!known) {
    return;
  }

  console.log(`${person.name} cunoaste: ${skill}`);
});

console.warn(
  `Prin aceeasi metoda, afiseaza o lista inversata cu numele complet inversat al prietenilor. `,
);

Object.entries(person.friends)
  .reverse()
  .forEach((entry) => {
    const [_, { name, surname }] = entry;

    console.log(`${surname} ${name}`);
  });

console.warn(
  `Afiseaza propozitia: “Prietenii mei sunt Larry, Steven si Carol.” folosind Object.entries()`,
);

const sentence = Object.entries(person.friends).reduce(
  (sentence, [_, { name }], index, friends) => {
    const punctuation =
      friends.length - 1 === index
        ? '.'
        : friends.length - 2 === index
        ? ' si '
        : ', ';

    sentence += name + punctuation;

    return sentence;
  },
  'Prietenii mei sunt ',
);

console.log(sentence);

console.warn(
  `In mod similar afiseaza mai multe propozitii (cate una per console.log()) care sa afiseze: “Diferenta de varsta intre Larry si Dragos este de xxx ani.” etc…`,
);

Object.entries(person.friends).forEach(([_, { name, age }]) => {
  const diff = Math.abs(age - person.age);

  console.log(
    `Diferenta de varsta dintre ${name} si ${person.name} este de ${diff} ani.`,
  );
});

console.warn(
  `Folosind Object.entries() pe proprietatea skills, afiseaza toate abilitatile din obiectul skills.`,
);

Object.entries(person.skills).forEach(([skill]) => {
  console.log(skill);
});

console.warn(
  `Prin aceeasi metoda, afiseaza o lista cu numele complet al prietenilor. `,
);

Object.entries(person.friends).forEach(([, friend]) => {
  const { name, surname } = friend;
  console.log(`${surname} ${name}`);
});

console.warn(
  `Afiseaza propozitia: “Prietenii mei sunt Larry Larryson, Steven Stevenson si Carol Carolson.” folosind Object.entries()`,
);

let message = Object.entries(person.friends).reduce(
  (message, [, friend], index, friends) => {
    const { name, surname } = friend;
    const length = friends.length;
    const punctuation =
      index === length - 1 ? '.' : index === length - 2 ? ' si ' : ', ';

    return `${message}${name} ${surname}${punctuation}`;
  },
  'Prietenii mei sunt ',
);
console.log(message);

console.warn(
  `In mod similar, afiseaza mai multe propozitii (cate una per console.log()) care sa afiseze: “Larry are xx ani. Steven are …”`,
);

Object.entries(person.friends).forEach(([, friend]) => {
  const { name, age } = friend;
  console.log(`${name} are ${age} ani.`);
});
