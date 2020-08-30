const hello = ({ content }: { content: string }): void => {
  console.log(`Hello from ${content}`);
};

hello({
  content: "he"
});
