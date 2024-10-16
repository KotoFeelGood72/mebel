declare module "vue-dadata-suggestions" {
  import { ComponentPublicInstance, DefineComponent } from "vue";

  interface Suggestion {
    value: string;
    unrestricted_value: string;
    data: any;
  }

  interface VueDadataSuggestionsProps {
    token: string;
    placeholder?: string;
    value?: string;
    onSelect?: (suggestion: Suggestion) => void;
  }

  const VueDadataSuggestions: DefineComponent<
    VueDadataSuggestionsProps,
    {},
    {}
  >;

  export default VueDadataSuggestions;
}
