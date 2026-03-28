# @silvanofrancotommasi/marquee-scroll

Animación de scroll tipo marquee suave para React con masks personalizables y triggers configurables.

---

## English (see Spanish below)

### Installation

```bash
npm install @silvanofrancotommasi/marquee-scroll
# or
yarn add @silvanofrancotommasi/marquee-scroll
# or
bun add @silvanofrancotommasi/marquee-scroll
```

### Basic Usage

```tsx
import { MarqueeMask } from "@silvanofrancotommasi/marquee-scroll";

function App() {
  return (
    <MarqueeMask>
      <p>This is a very long title that will scroll when you hover over it</p>
    </MarqueeMask>
  );
}
```

### With Custom Configuration

```tsx
import { MarqueeMask, Marquee } from "@silvanofrancotommasi/marquee-scroll";

function App() {
  return (
    <MarqueeMask
      mask={{
        enabled: true,
        size: 20,
        color: "rgba(0, 0, 0, 0.9)",
      }}
      speed={100}
      speedLeave={300}
    >
      <p>Custom speed and mask configuration</p>
    </MarqueeMask>
  );
}
```

### Programmatic Control with useMarquee Hook

```tsx
import { useMarquee } from "@silvanofrancotommasi/marquee-scroll";

function App() {
  const { enter, leave, marqueeRef } = useMarquee();

  return (
    <div>
      <button onClick={enter}>Start Animation</button>
      <button onClick={leave}>Reset Animation</button>
      
      <Marquee ref={marqueeRef}>
        <p>Long text that will animate</p>
      </Marquee>
    </div>
  );
}
```

### API

#### Marquee Component

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Content to animate |
| `trigger` | `"hover" \| "none"` | `"hover"` | Animation trigger type |
| `speed` | `number` | `75` | Animation speed in px/s (enter) |
| `speedLeave` | `number` | `200` | Animation speed in px/s (leave) |
| `direction` | `"left" \| "right"` | `"left"` | Scroll direction |
| `enabled` | `boolean` | `true` | Enable/disable animation |
| `className` | `string` | - | Additional CSS classes |
| `onDirectionChange` | `(direction) => void` | - | Callback when direction changes |
| `onIdleStateChange` | `(showLeft) => void` | - | Callback when idle state changes |

#### MarqueeMask Component

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Content to animate |
| `mask` | `MaskConfig \| boolean` | `{ enabled: true }` | Mask configuration |
| `className` | `string` | - | Additional CSS classes |
| `onDirectionChange` | `(direction) => void` | - | Callback when direction changes |
| `onIdleStateChange` | `(showLeft) => void` | - | Callback when idle state changes |

#### MaskConfig

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `enabled` | `boolean` | `true` | Show gradient masks |
| `size` | `number` | `12` | Mask width in pixels |
| `color` | `string` | `"rgba(0,0,0,0.8)"` | Gradient color |
| `left` | `ReactNode \| null` | `null` | Custom left mask component |
| `right` | `ReactNode \| null` | `null` | Custom right mask component |

#### useMarquee Hook

```tsx
const { enter, leave, marqueeRef } = useMarquee(options);
```

Options:
- `speed?: number` - Animation speed in px/s (enter)
- `speedLeave?: number` - Animation speed in px/s (leave)
- `direction?: "left" | "right"` - Scroll direction
- `enabled?: boolean` - Enable/disable animation
- `onEnter?: () => void` - Callback when entering
- `onLeave?: () => void` - Callback when leaving

### License

MIT - Silvano Franco Tommasi

---

## Español

### Instalación

```bash
npm install @silvanofrancotommasi/marquee-scroll
# o
yarn add @silvanofrancotommasi/marquee-scroll
# o
bun add @silvanofrancotommasi/marquee-scroll
```

### Uso Básico

```tsx
import { MarqueeMask } from "@silvanofrancotommasi/marquee-scroll";

function App() {
  return (
    <MarqueeMask>
      <p>Este es un título muy largo que hará scroll cuando haces hover</p>
    </MarqueeMask>
  );
}
```

### Con Configuración Personalizada

```tsx
import { MarqueeMask, Marquee } from "@silvanofrancotommasi/marquee-scroll";

function App() {
  return (
    <MarqueeMask
      mask={{
        enabled: true,
        size: 20,
        color: "rgba(0, 0, 0, 0.9)",
      }}
      speed={100}
      speedLeave={300}
    >
      <p>Velocidad y mask configurados</p>
    </MarqueeMask>
  );
}
```

### Control Programático con Hook useMarquee

```tsx
import { useMarquee } from "@silvanofrancotommasi/marquee-scroll";

function App() {
  const { enter, leave, marqueeRef } = useMarquee();

  return (
    <div>
      <button onClick={enter}>Iniciar Animación</button>
      <button onClick={leave}>Reiniciar Animación</button>
      
      <Marquee ref={marqueeRef}>
        <p>Texto largo que se animará</p>
      </Marquee>
    </div>
  );
}
```

### API

#### Componente Marquee

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Contenido a animar |
| `trigger` | `"hover" \| "none"` | `"hover"` | Tipo de trigger |
| `speed` | `number` | `75` | Velocidad en px/s (entrada) |
| `speedLeave` | `number` | `200` | Velocidad en px/s (salida) |
| `direction` | `"left" \| "right"` | `"left"` | Dirección del scroll |
| `enabled` | `boolean` | `true` | Habilitar/deshabilitar |
| `className` | `string` | - | Clases CSS adicionales |
| `onDirectionChange` | `(direction) => void` | - | Callback al cambiar dirección |
| `onIdleStateChange` | `(showLeft) => void` | - | Callback al cambiar estado idle |

#### Componente MarqueeMask

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Contenido a animar |
| `mask` | `MaskConfig \| boolean` | `{ enabled: true }` | Configuración del mask |
| `className` | `string` | - | Clases CSS adicionales |
| `onDirectionChange` | `(direction) => void` | - | Callback al cambiar dirección |
| `onIdleStateChange` | `(showLeft) => void` | - | Callback al cambiar estado idle |

#### MaskConfig

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `enabled` | `boolean` | `true` | Mostrar gradientes |
| `size` | `number` | `12` | Ancho del mask en píxeles |
| `color` | `string` | `"rgba(0,0,0,0.8)"` | Color del gradiente |
| `left` | `ReactNode \| null` | `null` | Componente custom izquierdo |
| `right` | `ReactNode \| null` | `null` | Componente custom derecho |

#### Hook useMarquee

```tsx
const { enter, leave, marqueeRef } = useMarquee(options);
```

Opciones:
- `speed?: number` - Velocidad de animación en px/s (entrada)
- `speedLeave?: number` - Velocidad de animación en px/s (salida)
- `direction?: "left" | "right"` - Dirección del scroll
- `enabled?: boolean` - Habilitar/deshabilitar animación
- `onEnter?: () => void` - Callback al entrar
- `onLeave?: () => void` - Callback al salir

### Licencia

MIT - Silvano Franco Tommasi
