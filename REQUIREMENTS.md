# FoxBash Project Requirements

## Project Overview
FoxBash is a web-based terminal interface project that consists of three main components:
1. Web Interface (Frontend)
2. Backend Server
3. CLI Process Manager

## Architecture Decisions

### Directory Structure
```
foxbash/
├── frontend/           # React frontend application
│   ├── src/           # React source code
│   ├── public/        # Static assets
│   └── package.json
│
├── backend/           # Node.js backend server
│   ├── src/
│   │   ├── api/      # REST API routes
│   │   ├── ws/       # WebSocket handlers
│   │   └── db/       # Database models/connections
│   └── package.json
│
├── cli/              # Python CLI tool
│   ├── src/
│   │   ├── process/  # Process management
│   │   └── ws/       # WebSocket client
│   ├── requirements.txt
│   └── setup.py
│
└── docker/           # Docker configuration (future use)
    ├── frontend/
    ├── backend/
    └── docker-compose.yml
```

### Technology Stack

#### 1. Frontend
- **Framework**: React (without Next.js)
  - Rationale: 
    - Lightweight solution for single-page application
    - Strong WebSocket support
    - No need for server-side rendering
    - Rich ecosystem for UI components
  - Key Features:
    - Real-time terminal interface
    - WebSocket communication with backend
    - Modern component architecture

#### 2. Backend
- **Framework**: Node.js + Express
  - Rationale:
    - Excellent WebSocket support via Socket.IO
    - Simple API creation
    - Easy static file serving
    - Future database integration capabilities
  - Key Features:
    - WebSocket server for real-time communication
    - API endpoints for system operations
    - Static file serving for frontend
    - Future database integration support

#### 3. CLI Tool
- **Language**: Python
  - Rationale:
    - Strong process management capabilities
    - Rich terminal handling
    - Cross-platform compatibility
    - Extensive WebSocket client libraries
  - Key Features:
    - Process spawning and management
    - Bidirectional communication with backend
    - Terminal output/input handling

## Frontend UI Requirements (FoxPro DOS Style)

### Color Scheme
- Screen background: Deep blue (#0000AA)
- Active window content: Cyan (#00AAAA)
- Inactive window content: Darker cyan (#007777)
- Window borders: 
  - Active: Light gray (#AAAAAA)
  - Inactive: Dark gray (#777777)
- Title bar: Matches border colors
- System menu: Light gray (#AAAAAA) with black text

### Typography & Character Grid
- Font: Perfect DOS VGA 437 (fallbacks: Menlo, Monaco, Courier)
- Font requirements:
  - Must align perfectly with character grid
  - Typically 10x20px per character
  - No anti-aliasing
  - No fractional character positions
  - Text must align with cell boundaries

### Window System

#### Title Bar
- Height: Exactly one character
- Components:
  - Close button (■): Left-aligned, no spacing
  - Title: One space after close button
  - Maximize button (≡): Right-aligned, no spacing
- Background changes with focus state
- No padding between controls and edges

#### Window Border
- Width: Single character
- Style: Single-line for regular windows
- Color: Matches title bar
- Must align with character grid

#### Shadow Implementation
- Character-based overlay using gray characters (░)
- Shadow dimensions:
  - Width: One character
  - Height: One character
- Positioning:
  - Right shadow: One character right of window
  - Bottom shadow: One character below window
  - Corner: Single character at intersection
- Must show underlying content through shadow
- Must follow character grid exactly

### Window Behaviors

#### Movement
- Must snap to character grid
- No sub-character positioning
- Shift + drag: Move without focus change
- Shadow moves with window

#### Resize
- Only from bottom-right corner
- Active indicator: Single dot (.)
- Must snap to character grid
- Minimum size: 15x5 characters

#### Focus Management
- Active window: Full color, bright borders
- Inactive window: Dimmed colors, gray borders
- Click to focus (unless shift held)
- Shadow should not affect focus detection

### Mouse System

#### Cursor
- Size: Full character cell
- Effect: Inverse video (XOR blend)
- Behavior:
  - Hides during keyboard input
  - Reappears on mouse movement
  - Must align to character grid

#### Cursor States
- Default: Character cell inverse
- Move: Same as default
- Resize: Same as default

### Technical Implementation Requirements

#### Grid System
- All measurements in character units
- No exposed pixel calculations
- All positioning snaps to grid
- Window sizes in whole characters

#### Rendering
- No alpha transparency
- No sub-pixel antialiasing
- No smooth transitions
- Everything must align to character grid

#### Event Handling
- Mouse positions in character coordinates
- All measurements in character units
- Movement/resize maintains character alignment

#### State Management
- Window positions in character coordinates
- Sizes in character units
- Focus state tracking
- Shadow rendering state

### Accessibility
- Keyboard navigation support
- Clear focus indication
- High contrast support
- Screen reader compatibility

## Communication Flow
```
Python CLI Tool <-> WebSocket <-> Backend Server <-> WebSocket <-> Frontend
```

## Future Considerations

### Database Integration
- Planned for future implementation
- Will be handled through backend API
- Potential options: MongoDB, PostgreSQL

### Containerization
- Docker support planned
- Will include:
  - Frontend container
  - Backend container
  - Database container (future)
  - CLI tool container

## Development Phases

### Phase 1: Core Implementation
- [ ] Frontend UI implementation (FoxPro DOS style)
  - [ ] Character grid system
  - [ ] Window management
  - [ ] Shadow rendering
  - [ ] Mouse interaction
- [ ] Backend WebSocket server
- [ ] Python CLI process manager
- [ ] Basic bidirectional communication

### Phase 2: Feature Enhancement
- [ ] Multiple terminal viewport support
- [ ] Process management improvements
- [ ] User interface enhancements

### Phase 3: Production Ready
- [ ] Database integration
- [ ] Docker containerization
- [ ] Security improvements
- [ ] Performance optimizations

## Notes
- This document will be updated as new requirements and decisions are made
- All major architectural decisions should be documented here
- Future features and changes should be discussed and added to relevant sections
