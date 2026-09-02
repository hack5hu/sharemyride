import { TurboModuleRegistry } from 'react-native';
import type { TurboModule } from 'react-native';

export interface Spec extends TurboModule {
  hide(fade: boolean): Promise<boolean>;
  setTheme(themeMode: string): void;
}

export default TurboModuleRegistry.get<Spec>('NativeSplash');
