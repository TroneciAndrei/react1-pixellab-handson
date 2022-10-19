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

console.warn(
  `Folosind metoda map pe arrayul skills, returneaza si afiseaza in consola un array in care fiecare consoana este scrisa cu litera mare (vocalele nu) `,
);

const vowels = ['a', 'e', 'i', 'o', 'u'];
const arr1 = person.skills.map((skill) => {
  const letters = skill.split('');

  letters.forEach((letter, index, letters) => {
    if (!vowels.includes(letter)) {
      letters[index] = letters[index].toUpperCase();
    }
  });

  return letters.join('');
});

console.log(arr1);

console.warn(`Folosind map pe arrayul friends, returneaza un array in care fiecare pozitie contine propozitia
“Ma numesc {name} {surname} si am {age} ani.”`);

const arr2 = person.friends.map(({ name, surname, age }) => {
  return `Ma numesc ${name} ${surname} si am ${age} ani.`;
});

console.log(arr2);

console.warn(`Folosind map pe arrayul friends, returneaza un array in care fiecare pozitie contine propozitia
“Diferenta de varsa dintre {friendName} si {personName} este {diff}”`);

const arr3 = person.friends.map(({ name, age }) => {
  const ageDiff = Math.abs(person.age - age);

  return `Differenta de varsta dintre ${person.name} si ${name} este ${ageDiff}`;
});

console.log(arr3);

console.warn(
  `Returneaza si afiseaza un array in care fiecare pozitie contine diferenta dintre varsta persoanei si lungimea cuvantului de pe arrayul skill `,
);

const arr4 = person.skills.map((skill) => {
  const skillLength = skill.length;

  return Math.abs(person.age - skillLength);
});

console.log(arr4);
