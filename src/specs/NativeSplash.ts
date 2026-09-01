import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  hide(fade: boolean): Promise<boolean>;
  setTheme(themeMode: string): void;
}

export default TurboModuleRegistry.get<Spec>('NativeSplash');
