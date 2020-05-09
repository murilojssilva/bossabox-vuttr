export function signIn() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        token: "udasbubbiube23eb832bbdr4bfdbadsbabhdb23",
        user: {
          name: "Murilo",
          email: "murilojssilva@outlook.com",
        },
      });
    }, 2000);
  });
}
