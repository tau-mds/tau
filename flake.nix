{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs =
    inputs:
    inputs.flake-utils.lib.eachDefaultSystem (
      system:
      let
        pkgs = import inputs.nixpkgs { inherit system; };
      in
      {
        devShell = pkgs.mkShell {
          buildInputs = with pkgs; [
            fnm
            pnpm
          ];

          packages = with pkgs; [
            nil
            nixd
          ];

          shellHook = ''
            echo "Installing @antfu/ni globally..."
            npm add --global turbo @antfu/ni
          '';
        };
      }
    );
}
