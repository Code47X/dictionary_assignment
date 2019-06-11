class DictService {
  constructor() {
    // Should hide api key, but leaving in plain text for now
    this.apiKey = "34267ace-cbe2-4d66-9f67-2dfbae120152"
  }

  getDefinition = async word => {
    try {
      const response = await this.fetch(word)
      const data = await response.json();

      const definition = (data.length > 0 && data[0].shortdef ? data[0].shortdef[0] : "definition not found")

      return definition;
    } catch (e) {
      console.log(e);
    }
  }

  fetch = (word, options) => {
    const url = `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${this.apiKey}`
    const headers = {
      "Accept": "application/json",
    };

    return fetch(url, {
      headers,
      method: "GET",
      ...options
    })
  }
}

export default new DictService();
