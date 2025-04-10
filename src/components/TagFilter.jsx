const tags = ["blog", "react", "guide", "remix", "life"];

export function TagFilter() {
  <div>
    yoo
    <input id="pills-input" type="" placeholder="PILLS GO HERE" />
    <input id="tags-datalist-input" type="text" list="tags-datalist" placeholder="SEARCH" />
    <datalist id="tags-datalist">
      {tags.map((tag) => (
        // TODO change key to use an unique id
        <option key={tag} value={tag}>
          {tag}
        </option>
      ))}
    </datalist>
  </div>;
}

{
  /* <script>
  const pillsInput = document.getElementById("pills-input");
  const datalistInput = document.getElementById("tags-datalist-input");
  datalistInput!.addEventListener("input", (event) => {
    const { value } = event.target as HTMLInputElement;
    if (value) {
      console.log({ value });
    }
  });
</script> */
}
