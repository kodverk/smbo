export namespace Email {
  export async function send(params: {
    to: string;
    from: string;
    subject: string;
    body: string;
  }) {
    console.info(params);
  }
}
