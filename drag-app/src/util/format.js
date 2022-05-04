// const date = Date.now();

// console.log(new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(today));



// export const date = new Date(2019, 11, 12);
// const formated = (new Intl.DateTimeFormat('pt-br')).format(date);

export const { format: formatDate } = new Intl.DateTimeFormat('pt-br', {
    timeZone:'UTC'
})
  