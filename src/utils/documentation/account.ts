export default {
  resource: {
    title: 'Account',
// tslint:disable-next-line: max-line-length
    details: 'Account is used to identify current user accessing the website via token. You can also get other important user information you can use in the application such as markets available to the user, subscription level, card info, charges made and invoices.',
  },
  parameters: [
    {
      name: 'token',
      type: 'string',
      isRequired: true,
      details: 'token generated from createAccessToken mutation',
    },
  ],
  request: `
    account (token: $token) {
      *** fields you want to retrieve
    }
  `,
  response: [
    {
      name: 'token',
      type: 'string',
      isRequired: true,
      details: 'token generated from createAccessToken mutation',
    },
  ],
};
