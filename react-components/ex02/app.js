const person = {
  name: 'Dragos',
  surname: 'Iordache',
  age: 32,
  petOwner: false,
  skills: [
    'html',
    'javascript',
    'css',
    'java',
    'c++',
    'node',
    'jquery',
    'node.js',
  ],
  friends: [
    {
      name: 'Larry',
      surname: 'Larryson',
      age: 30,
    },
    {
      name: 'Steven',
      surname: 'Stevenson',
      age: 31,
    },
    {
      name: 'Carol',
      surname: 'Carolson',
      age: 29,
    },
  ],
};

const dropChars = (string, charsCount = 2) => {
  return string.slice(0, string.length - charsCount);
};

console.warn(
  `Folosind obiectul person si redyce, afiseaza in consola un string care contine skillurile de pe pozitiile pare ale arrayului, separate prin virgula`,
);

const string1 = person.skills.reduce((string1, skill, index) => {
  if (index % 2 === 0) {
    string1 += `${skill}, `;
  }

  return string1;
}, '');

console.log(dropChars(string1));

console.warn(` In mod similar, afiseaza skillurile care NU incep cu j.`);

const string2 = person.skills.reduce((string2, skill) => {
  if (!skill.startsWith('j')) {
    string2 += `${skill}, `;
  }

  return string2;
}, '');

console.log(dropChars(string2));

console.warn(
  ` Folosind reduce afiseaza propozitia: "Prietenii mei se numesc xxx yyy, xxx yyy, xxx yyy."`,
);

const sentence = person.friends.reduce(
  (sentence, { name, surname }, index, friends) => {
    const punctuation = index === friends.length - 1 ? '.' : ', ';

    sentence += `${name} ${surname}${punctuation}`;

    return sentence;
  },
  'Prietenii mei se numesc ',
);

console.log(sentence);

console.warn(
  ` Folosind reduce, afiseaza numarul total de ani pe care il au persoanele din arrayul friends, doar daca varsta este mai mare sau egala cu 30 de ani.`,
);

const sumYears = person.friends.reduce((sumYears, { age }) => {
  if (age >= 30) {
    sumYears += age;
  }

  return sumYears;
}, 0);

console.log(sumYears);

console.warn(
  `Folosind reduce, afiseaza suma anilor de nastere a persoanelor. `,
);

const sumBirthYears = person.friends.reduce((sumBirthYears, { age }) => {
  const currentYear = new Date().getFullYear();

  sumBirthYears += currentYear - age;

  return sumBirthYears;
}, 0);

console.log(sumBirthYears);

console.warn(
  ` Afiseaza fraza: "Intre Dragos si Larry este o diferenta de xx ani. Intre Dragos si Steven... ", doar daca varsta prietenului este impara. `,
);

const string3 = person.friends
  .reduce((string3, { age, name }) => {
    string3 += `Intre ${person.name} si ${name} este o diferenta de ${Math.abs(
      person.age - age,
    )} ani. `;

    return string3;
  }, '')
  .trim();

console.log(string3);

console.warn(
  `Folosind obiectul person si reduce, afiseaza in consola un string care contine skillurile persoanei, separate prin virgula`,
);

const string4 = person.skills.reduce((string4, skill, index, skills) => {
  const punctuation = index === skills.length - 1 ? '.' : ', ';
  return `${string4}${skill}${punctuation}`;
}, '');

console.log(string4);

console.warn(`In mod similar, afiseaza skillurile care incep cu c `);

const string5 = person.skills.reduce((string5, skill, index, skills) => {
  const punctuation = index === skills.length - 1 ? '.' : ', ';
  if (skill.substring(0, 1) != 'c') {
    return string5;
  }
  return `${string5}${skill}${punctuation}`;
}, '');

console.log(string5);

console.warn(
  ` Folosind reduce afiseaza propozitia: "Numele de familie ale prietenilor mei sunt: xxx, xxx , xxx."`,
);

const string6 = person.friends.reduce((string6, friend, index, friends) => {
  const punctuation = index === friends.length - 1 ? '.' : ', ';
  return `${string6}${friend.name}${punctuation}`;
}, 'Numele de familie ale prietenilor mei sunt: ');

console.log(string6);

console.warn(
  ` Folosind reduce, afiseaza numarul total de ani pe care il au persoanele din arrayul friends `,
);

const totalAge = person.friends.reduce((totalAge, friend) => {
  return (totalAge += friend.age);
}, 0);

console.log(totalAge);

console.warn(` Folosind reduce, afiseaza suma anilor  persoanelor. `);

const sumTotalAge = person.friends.reduce((sumTotalAge, friend) => {
  return (sumTotalAge += friend.age);
}, person.age);

console.log(sumTotalAge);

console.warn(
  `Afiseaza diferenta de varsta dintre persoana si prietenii din arrayul friends. `,
);

const differenceAge = person.friends.reduce((differenceAge, friend) => {
  return differenceAge - friend.age;
}, person.age);

console.log(differenceAge);

console.warn(
  `Afiseaza fraza: "Intre Dragos si Larry este o diferenta de xx ani. Intre Dragos si Steven... ". Repeta pentru tot arrayul friends.`,
);

const string7 = person.friends
  .reduce((string7, friend) => {
    return (string7 += `Intre ${person.name} si ${
      friend.name
    } este o diferenta de ${person.age - friend.age} ani. `);
  }, '')
  .trim();

console.log(string7);
