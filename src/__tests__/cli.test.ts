import { exec } from 'child_process';
import { promisify } from 'util';
import chalk from 'chalk';

const execAsync = promisify(exec);

describe('CLI Integration Tests', () => {
  const ingredientsList = "Water (Aqua), Disodium Laureth Sulfosuccinate, Sodium C14-16 Olefin Sulfonate, Cocamidopropyl Betaine, Cocamidopropyl Hydroxysultaine, PEG-12 Dimethicone, Cocamide MIPA, Glycol Distearate, Hydrolyzed Keratin, Theobroma Cacao (Cocoa) Seed Butter, Fragrance (Parfum), Cocos Nucifera (Coconut) Oil, Persea Gratissima (Avocado) Oil, Aloe Barbadensis Leaf Extract, Panthenol, Polyquaternium-11, DMDM Hydantoin, Sodium Chloride, Cetyl Alcohol, Guar Hydroxypropyltrimonium Chloride, PEG-14M, Blue 1 (CI 42090), Red 40 (CI 16035), Yellow 5 (CI 19140)";

  it('should execute successfully with valid ingredients list', async () => {
    const { stdout, stderr } = await execAsync(`node dist/cli.js "${ingredientsList}"`);
    expect(stderr).toBe('');
    expect(stdout).toBeTruthy();
  });

  it('should contain key ingredients in the output', async () => {
    const { stdout } = await execAsync(`node dist/cli.js "${ingredientsList}"`);

    // Check for presence of key ingredients
    expect(stdout).toContain('Water');
    expect(stdout).toContain('PEG-12 Dimethicone');
    expect(stdout).toContain('Cocamidopropyl Betaine');
  });

  it('should show correct summary statistics', async () => {
    const { stdout } = await execAsync(`node dist/cli.js "${ingredientsList}"`);

    expect(stdout).toContain('Total ingredients: 24');
    expect(stdout).toContain('Summary:');
  });

  it('should display category information', async () => {
    const { stdout } = await execAsync(`node dist/cli.js "${ingredientsList}"`);

    expect(stdout).toContain('Categories:');
    expect(stdout).toContain('Categories Found:');
  });

  it('should fail gracefully with empty input', async () => {
    let didNotThrow = false;

    try {
      await execAsync('node dist/cli.js ""');
      didNotThrow = true;
    } catch (error: any) {
      expect(error).toHaveProperty('stderr');
      expect(error.stdout || error.stderr).toMatch(/error|invalid|empty/i);
    }

    expect(didNotThrow).toBe(false);
  });

  it('should handle special characters in ingredients', async () => {
    const ingredientWithParens = 'Water (Aqua)';
    const { stdout } = await execAsync(`node dist/cli.js "${ingredientWithParens}"`);
    expect(stdout).toContain('Water');
  });
});

// Mock console.log to test colored output
/*describe('CLI Color Output Tests', () => {
  let consoleLogSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
  });

  it('should use correct colors for different impacts', () => {
    const getImpactColor = require('../cli').getImpactColor;

    expect(getImpactColor('good')).toBe(chalk.green);
    expect(getImpactColor('caution')).toBe(chalk.yellow);
    expect(getImpactColor('bad')).toBe(chalk.red);
    expect(getImpactColor('unknown')).toBe(chalk.gray);
    expect(getImpactColor('neutral')).toBe(chalk.blue);
  });
}

); */
