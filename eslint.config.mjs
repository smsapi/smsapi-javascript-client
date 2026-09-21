import js from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import importPlugin from 'eslint-plugin-import';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';

export default [
  {
    ignores: ['node_modules/', 'dist/'],
  },
  js.configs.recommended,
  importPlugin.flatConfigs.errors,
  importPlugin.flatConfigs.warnings,
  importPlugin.flatConfigs.typescript,
  tsPlugin.configs['flat/eslint-recommended'],
  ...tsPlugin.configs['flat/recommended'],
  prettierRecommended,
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.es2020,
        ...globals.node,
      },
      parser: tsParser,
      sourceType: 'module',
    },
    rules: {
      'import/no-default-export': 'error',
      'import/order': [
        'error',
        {
          'newlines-between': 'always',
        },
      ],
      'prettier/prettier': 'error',
      'sort-keys': 'error',
    },
  },
  {
    files: ['eslint.config.mjs'],
    rules: {
      'import/no-default-export': 'off',
      'import/no-unresolved': 'off',
    },
  },
];
