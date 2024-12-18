#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import { Analyzer, CategoryGroup } from 'haircare-ingredients-analyzer';
import { ingredients } from './data/ingredients';
import { categories } from './data/categories';


const program = new Command();

function getImpactColor(impact: 'good' | 'caution' | 'bad' | 'unknown' | 'neutral'): chalk.Chalk {
  switch (impact) {
    case 'good':
      return chalk.green;
    case 'caution':
      return chalk.yellow;
    case 'bad':
      return chalk.red;
    case 'unknown':
      return chalk.gray;
    case 'neutral':
      return chalk.blue;
    default:
      return chalk.white;
  }
}

function findCategoryGroup(categoryName: string): string {
  for (const group of Object.values(categories)) {
    if (categoryName in (group as CategoryGroup).categories) {
      return group.name;
    }
  }
  return 'Other';
}

program
  .name('analyze-ingredients')
  .description('Analyze haircare product ingredients')
  .argument('<ingredients>', 'Comma-separated list of ingredients')
  .action((ingredientsString: string) => {
    // Add input validation
    if (!ingredientsString || ingredientsString.trim() === '') {
      console.error('Error: Ingredients list cannot be empty');
      process.exit(1);  // Exit with error code
    }

    // Initialize the analyzer with your config
    const analyzer = new Analyzer({
      database: {
        ingredients,
        categories
      }
    });

    const analysis = analyzer.analyzeIngredients(ingredientsString);

    console.log(chalk.bold('\nIngredient Analysis Results:\n'));

    // Ingredient Analysis
    analysis.matches.forEach(result => {
      if (result.matched) {
        console.log(chalk.green('✓'), chalk.bold(result.name));

        if (result.fuzzyMatch) {
          console.log(chalk.yellow('  Fuzzy matched with confidence:', Math.round(result.confidence! * 100) + '%'));
        }

        if (result.matchedSynonym) {
          console.log(chalk.blue('  Matched synonym:', result.matchedSynonym));
        }

        // Display categories with their metadata
        if (result.categories && result.categories.length > 0) {
          console.log(chalk.bold('\n  Categories:'));
          result.categories.forEach(categoryName => {
            const categoryInfo = analyzer.getCategoryInfo(categoryName);
            const groupName = analyzer.getCategoryGroup(categoryName);

            if (categoryInfo) {
              const impactColor = getImpactColor(categoryInfo.impact);
              console.log(
                '   •',
                chalk.bold(`${categoryInfo.name} `),
                chalk.dim(`(${groupName})`),
                impactColor(`[${categoryInfo.impact}]`)
              );
              console.log('     ', chalk.dim(categoryInfo.description));
              if (categoryInfo.notes) {
                console.log('     ', chalk.italic.dim(categoryInfo.notes));
              }
            } else {
              console.log('   •', categoryName);
            }
          });
        }

        console.log('\n  Description:', result.details!.description);

        if (result.details!.notes) {
          console.log('  Notes:', chalk.italic(result.details!.notes));
        }

        console.log();
      } else {
        console.log(chalk.blue('?'), chalk.bold(result.name), '- Unknown ingredient\n');
      }
    });

    // Summary Statistics
    const matchedCount = analysis.matches.filter(r => r.matched).length;
    const totalCount = analysis.matches.length;
    const matchPercentage = Math.round((matchedCount / totalCount) * 100);

    console.log(chalk.bold('\nSummary:'));
    console.log(`Total ingredients: ${totalCount}`);
    console.log(`Matched ingredients: ${matchedCount} (${matchPercentage}%)`);
    console.log(`Unmatched ingredients: ${totalCount - matchedCount}`);

    // Category Summary
    console.log(chalk.bold('\nCategories Found:'));

    if (analysis.categories && analysis.categories.length > 0) {
      // Group categories by their group
      const categoriesByGroup = new Map<string, string[]>();

      analysis.categories.forEach(categoryName => {
        const groupName = findCategoryGroup(categoryName);
        if (!categoriesByGroup.has(groupName)) {
          categoriesByGroup.set(groupName, []);
        }
        categoriesByGroup.get(groupName)!.push(categoryName);
      });

      // Display grouped categories with impact indicators
      if (categoriesByGroup.size === 0) {
        console.log(chalk.yellow('No categories found for matched ingredients.'));
      } else {
        categoriesByGroup.forEach((categories, groupName) => {
          console.log(chalk.bold(`\n${groupName}:`));
          categories.forEach(categoryName => {
            let categoryInfo = null;
            for (const group of Object.values(categories)) {
              const typedGroup = (group as unknown) as CategoryGroup;
              if (group && typedGroup.categories && categoryName in typedGroup.categories) {
                categoryInfo = typedGroup.categories[categoryName];
                break;
              }
            }

            if (categoryInfo) {
              const impactColor = getImpactColor(categoryInfo.impact);
              console.log(`  • ${categoryInfo.name} ${impactColor(`[${categoryInfo.impact}]`)}`);
            } else {
              console.log(`  • ${categoryName}`);
            }
          });
        });
      }
    } else {
      console.log(chalk.yellow('No categories found for matched ingredients.'));
    }

    console.log();
  });

program.parse();
