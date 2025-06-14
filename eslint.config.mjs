import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  // Adiciona um novo objeto de configuração para suas regras personalizadas
  {
    // A propriedade `ignores` aceita um array de padrões glob
    ignores: ["./app/generated/**"],
  },
];

export default eslintConfig;
