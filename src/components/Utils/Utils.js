import React from 'react'
import './Utils.css'

/* Some of these might eventually be useful in other parts of the app, so I'm keeping the ones out of use commented out for the moment.*/

// export function Button({ className, ...props }) {
//   return <button className={['Button', className].join(' ')} {...props} />
// }

// export function Textarea({ className, ...props }) {
//   return (
//     <textarea className={['Textarea', className].join(' ')} {...props} />
//   )
// }

//Slugify a string for html use


export function TextInput({ className, name, ...props }) {

  function slugify(string) {
    const a = 'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;'
    const b = 'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------'
    const p = new RegExp(a.split('').join('|'), 'g')
  
    return string.toString().toLowerCase()
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
      .replace(/&/g, '-and-') // Replace & with 'and'
      .replace(/[^\w\-]+/g, '') // Remove all non-word characters
      .replace(/\-\-+/g, '-') // Replace multiple - with single -
      .replace(/^-+/, '') // Trim - from start of text
      .replace(/-+$/, '') // Trim - from end of text
  }

  return (
    <>
      <label htmlFor={slugify(name)}>{name}</label>
      <input type='text' {...props} />
    </>
  );
}

export function Input({ className, ...props }) {
  return (
    <input className={['Input', className].join(' ')} {...props} />
  )
}

export function Required({ className, ...props }) {
  return (
    <span className={['Required', className].join(' ')} {...props}>
      &#42;
    </span>
  )
}

// export function Section({ className, list, ...props }) {
//   const classes = [
//     'Section',
//     list && 'Section--list',
//     className,
//   ].filter(Boolean).join(' ')
//   return (
//     <section className={classes} {...props} />
//   )
// }
